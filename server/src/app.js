const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "teste";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Erro de conexão SMTP:", error);
  } else {
    console.log("Servidor SMTP pronto para enviar mensagens.");
  }
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.user ? req.user.userId : "guest"}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

app.post("/recover-password", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado!" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(resetToken, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: hashedToken,
      tokenExpiry: new Date(Date.now() + 3600000),
    },
  });

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: "Recuperação de senha",
    text: `Para resetar sua senha, clique no link: ${resetLink}`,
  });

  res.send({ message: "E-mail de recuperação de senha enviado!" });
});

app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        tokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user || !(await bcrypt.compare(token, user.resetToken))) {
      return res.status(400).send({ message: "Token inválido ou expirado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        tokenExpiry: null,
      },
    });

    res.send({ message: "Senha redefinida with sucesso!" });
  } catch (error) {
    console.error("Erro ao redefinir a senha", error);
    res.status(500).send({ message: "Erro ao redefinir a senha" });
  }
});

app.post("/verify-token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .send({ valid: false, message: "Token não fornecido!" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({ valid: false, message: "Token inválido!" });
    }
    res.send({ valid: true, message: "Token válido!", userId: decoded.userId });
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(409).send({ message: "Este e-mail já está em uso." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
      },
    });

    const verificationLink = `http://localhost:3001/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Confirme seu endereço de e-mail",
      text: `Por favor, clique no link para verificar seu e-mail: ${verificationLink}`,
    });

    res.status(201).send({
      message:
        "Registro realizado com sucesso! Por favor, verifique seu e-mail.",
    });
  } catch (error) {
    console.error("Erro ao registrar o usuário", error);
    res.status(500).send({ message: "Erro ao registrar o usuário" });
  }
});

app.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        emailVerified: false,
      },
    });

    if (!user) {
      return res.status(400).send({ message: "Token inválido ou expirado!" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    const jwtToken = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.redirect(`http://localhost:5173/email-verified?token=${jwtToken}`);
  } catch (error) {
    console.error("Erro ao verificar o e-mail", error);
    res.status(500).send({ message: "Erro ao verificar o e-mail" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "E-mail ou senha incorretos!" });
    }

    if (!user.emailVerified) {
      return res.status(401).send({
        message: "Por favor, verifique seu e-mail antes de fazer login.",
      });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.send({ message: "Login realizado with sucesso!", token });
  } catch (error) {
    console.error("Erro ao tentar fazer login", error);
    res.status(500).send({ message: "Erro ao tentar fazer login" });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token não fornecido!" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Token inválido!" });
    }
    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send({ message: "Conteúdo protegido acessado com sucesso!" });
});

app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { likedProducts: true },
    });
    res.send(user);
  } catch (error) {
    console.error("Erro ao obter o perfil do usuário", error);
    res.status(500).send({ message: "Erro ao obter o perfil do usuário" });
  }
});

app.post("/profile/update-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).send({ message: "Senha atual incorreta!" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    res.send({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar a senha", error);
    res.status(500).send({ message: "Erro ao atualizar a senha" });
  }
});

app.delete("/profile/delete", authenticateToken, async (req, res) => {
  try {
    // Encontrar o usuário
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    // Se o usuário tiver uma foto de perfil, exclua-a
    if (user && user.profilePicture) {
      const filePath = path.join(__dirname, user.profilePicture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Excluir o usuário
    await prisma.user.delete({
      where: { id: req.user.userId },
    });

    res.send({ message: "Conta excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir a conta", error);
    res.status(500).send({ message: "Erro ao excluir a conta" });
  }
});

app.post(
  "/profile/upload-picture",
  authenticateToken,
  upload.single("picture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "Nenhuma imagem enviada!" });
      }

      // Encontrar o usuário
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
      });

      // Se o usuário tiver uma foto de perfil, exclua-a
      if (user && user.profilePicture) {
        const oldFilePath = path.join(__dirname, user.profilePicture);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Salvar a nova imagem
      const picturePath = `/uploads/${req.file.filename}`;
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { profilePicture: picturePath },
      });
      res.send({
        message: "Foto de perfil atualizada com sucesso!",
        picturePath,
      });
    } catch (error) {
      console.error("Erro ao atualizar a foto do perfil", error);
      res.status(500).send({ message: "Erro ao atualizar a foto do perfil" });
    }
  }
);

app.get("/products", async (req, res) => {
  try {
      const products = await prisma.product.findMany({
          include: {
              flavors: true,
              sizes: true,
          },
      });
      res.send(products);
  } catch (error) {
      console.error("Erro ao buscar produtos", error);
      res.status(500).send({ message: "Erro ao buscar produtos" });
  }
});

app.post("/products/:id/like", authenticateToken, async (req, res) => {
  try {
      const userId = req.user.userId;
      const productId = parseInt(req.params.id);

      // Check if user already liked the product
      const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { likedProducts: true },
      });

      const alreadyLiked = user.likedProducts.some(
          (product) => product.id === productId
      );

      if (alreadyLiked) {
          await prisma.user.update({
              where: { id: userId },
              data: {
                  likedProducts: {
                      disconnect: { id: productId },
                  },
              },
          });
          res.send({ message: "Produto descurtido com sucesso!" });
      } else {
          await prisma.user.update({
              where: { id: userId },
              data: {
                  likedProducts: {
                      connect: { id: productId },
                  },
              },
          });
          res.send({ message: "Produto curtido com sucesso!" });
      }
  } catch (error) {
      console.error("Erro ao curtir/descurtir produto", error);
      res.status(500).send({ message: "Erro ao curtir/descurtir produto" });
  }
});

app.post("/cart/add", async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || quantity === undefined) {
      return res.status(400).send({ message: "ProductId ou Quantity não fornecido!" });
  }
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  
  const product = await prisma.product.findUnique({
      where: { id: productId },
  });
  if (!product) {
      return res.status(404).send({ message: "Produto não encontrado!" });
  }

  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
          cart = cart.filter(item => item.productId !== productId);
      }
  } else if (quantity > 0) {
      cart.push({ productId, quantity });
  }

  res.cookie("cart", JSON.stringify(cart), { httpOnly: true });
  
  // Re-fetch all cart items with product details
  const updatedCartItems = await Promise.all(cart.map(async item => {
    const updatedProduct = await prisma.product.findUnique({
        where: { id: item.productId },
    });
    return { product: updatedProduct, quantity: item.quantity };
  }));

  res.send(updatedCartItems);
});

app.post("/cart/remove", async (req, res) => {
  try {
      const { productId } = req.body;
      if (productId === undefined) {
          return res.status(400).send({ message: "ProductId não fornecido!" });
      }
      let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
      cart = cart.filter(item => item.productId !== productId);

      res.cookie("cart", JSON.stringify(cart), { httpOnly: true });

      res.send(cart);
  } catch (error) {
      console.error("Erro ao remover produto do carrinho", error);
      res.status(500).send({ message: "Erro ao remover produto do carrinho" });
  }
});

app.get("/cart", async (req, res) => {
  try {
      const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
      const cartItems = await Promise.all(cart.map(async item => {
          const product = await prisma.product.findUnique({
              where: { id: item.productId },
          });
          return product ? { product, quantity: item.quantity } : undefined;
      }));

      res.send(cartItems.filter(item => item !== undefined));
      
  } catch (error) {
      console.error("Erro ao listar produtos do carrinho", error);
      res.status(500).send({ message: "Erro ao listar produtos do carrinho" });
  }
});

app.post('/cart/clear', authenticateToken, async (req, res) => {
  try {
    // Limpar o cookie do carrinho
    res.cookie('cart', JSON.stringify([]), { httpOnly: true });
    res.send({ message: "Carrinho limpo com sucesso." });
  } catch (error) {
    console.error("Erro ao limpar o carrinho", error);
    res.status(500).send({ message: "Erro ao limpar o carrinho" });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => {
        return {
          price_data: {
            currency: 'brl',
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100, // preço em centavos
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: 'http://localhost:5173/sucesso',
      cancel_url: 'http://localhost:5173/cancelado',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
