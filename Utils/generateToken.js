import jwt from 'jsonwebtoken';

const generateToken = (id,res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10h',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: 'strict',
    maxAge: 10 * 60 * 60 * 1000, // 10 hours 
  });


  return token;
}

export default generateToken;