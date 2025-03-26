export const apiList = {
  getToken: "/auth/login",
  authorization: "/auth/me",
  getProducts: "/products",
  getProductCategories: "/products/categories",
  getAllUsers: "/users",
};

export const enumList = {
  productCategories: {
    badge: {
      beauty: {
        text: "Beauty",
        border: "#E91E63", // Pinkish-Red
        color: "#880E4F", // Darker shade for text
        background: "rgba(233, 30, 99, 0.15)", // Softer pink
      },
      fragrances: {
        text: "Fragrances",
        border: "#673AB7", // Purple
        color: "#4527A0", // Darker purple for text
        background: "rgba(103, 58, 183, 0.15)", // Light purple
      },
      furniture: {
        text: "Furniture",
        border: "#795548", // Brown
        color: "#3E2723", // Darker brown for text
        background: "rgba(121, 85, 72, 0.15)", // Light brown
      },
      groceries: {
        text: "Groceries",
        border: "#4CAF50", // Green
        color: "#1B5E20", // Dark green for text
        background: "rgba(76, 175, 80, 0.15)", // Softer green
      },
    },
  },
  userRoles: {
    badges: {
      admin: "success",
      moderator: "primary",
      user: "danger",
    },
  },
};

export const pageTitleList = {
  titles: {
    login: "Next App - Login",
    dashboard: "Next App - Dashboard",
    products: "Next App - Products",
    categories: "Next App - Categories",
    settings: "Next App - Settings",
  },
  subtitles: {
    "user-management": "Settings - User Management",
    document: "Settings - Document",
    profile: "Settings - Profile",
  },
};
