export default {
  ssr: false,
  basename: process.env.NODE_ENV === "production" ? "/sistema-imc/" : "/",
};
