import axiosInstance from "../axios";
// get all product slug
// const getSlugs = async () => {
//   const response = await axios.get("/api/products/slug-list");
//   return response.data;
// };

// get product based on slug
// categories
export const getAlltodos = async () => {
  const response = await axiosInstance.get("/api/entries");
  return response.data;
};
export const createtodo = async (body) => {
  const response = await axiosInstance.post("/api/entries",body);
  return response
};
export const deletetodo = async (id) => {
  const response = await axiosInstance.delete(`/api/entries/${id}`);
  return response
};
export const updatetodo = async (id,body) => {
  
  const response = await axiosInstance.put(`/api/entries/${id}`,{disc: body});
  return response
};
// export const getProductsBySlug = async (slug) => {
//   const response = await axiosInstance.get(`/products/slug/?slug=${slug}`);
//   // console.log(response.data)
//   return response.data;
// };
// export const getProductsByName = async (name) => {
//   const response = await axiosInstance.get(`/products/name/${name}`);
//   return response.data;
// };


// // search profucts
// const searchProducts = async (name, category) => {
//   const response = await axios.get("/api/products/search", {
//     params: {
//       name,
//       category
//     }
//   });
//   return response.data;
// };
export default {
  getAlltodos,
  createtodo,deletetodo,updatetodo
};