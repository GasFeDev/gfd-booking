import User from "../models/User.js";

/* bcrypt: Asociado al requisito de seguridad, así como al de confidencialidad de los datos, va unida la ocultación de información en la base de datos (para que no puedan ser leídas por cualquiera que tenga acceso a la misma).
A veces basta con encriptar / hashear las password de los usuarios, otras hay que encriptar mucha más información. Aunque, por desgracia, en muchos proyectos esto todavía se sigue dejando de lado y se mantienen las password en la base de datos en claro. En las implementaciones de API, guardar un hash de la password debe complementarse con sistemas de autenticación que mantengan la seguridad durante el acceso a todos los recursos.
Imaginemos que nuestra contraseña al registrarnos es abc123. Al crear el hash, le hemos pasado a bcrypt un saltRounds numérico y con él ha generado un segmento aleatorio, por ejemplo, FvT4pO8HMbZX3ravxa8pEOVAenB. La librería además le añadirá delante unos parámetros de control, para saber con qué algoritmo está implementado, y para conocer la complejidad salt usado, por ejemplo $2a$10$. Usando el salt encriptará la password (abc123) y obtendrá como resultado otra cadena, por ejemplo oXAUXEckEmHaHSuB8oNlvsLzR. Con un carácter separador unirá la primera parte generada con la password encriptada, quedando algo así: $2a$10$FvT4pO8HMbZX3ravxa8pEOVAenB/oXAUXEckEmHaHSuB8oNlvsLzR */
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"; /* Basado en JSON para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros. El caso más común de uso de los JWT es para manejar la autenticación en aplicaciones móviles o web. */

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
