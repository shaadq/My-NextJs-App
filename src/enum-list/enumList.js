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

export const userRoles = {
  badges: {
    admin: "success",
    moderator: "primary",
    user: "danger",
  },
  rolesDropdown: [
    {
      value: 1,
      label: "Admin",
    },
    {
      value: 2,
      label: "Recruiter",
    },
    {
      value: 3,
      label: "Job Seeker",
    },
  ],
  roles: {
    1: {
      class: "success",
      text: "Admin",
    },
    2: {
      class: "primary",
      text: "Recruiter",
    },
    3: {
      class: "danger",
      text: "Job Seeker",
    },
  },
};

export const jobStatus = {
  text: {
    1: "Active",
    2: "Closed",
    3: "Pending Approval",
  },
  dropdown: [
    {
      value: 1,
      label: "Active",
    },
    {
      value: 2,
      label: "Closed",
    },
    {
      value: 3,
      label: "Pending Approval",
    },
  ],
  status: {
    1: {
      class: "primary",
      text: "Active",
    },
    2: {
      class: "danger",
      text: "Closed",
    },
    3: {
      class: "warning",
      text: "Pending Approval",
    },
  },
};

export const jobType = {
  text: {
    1: "Full-time",
    2: "Part-time",
    3: "Remote",
    4: "Internship",
  },
  dropdown: [
    {
      value: 1,
      label: "Full-time",
    },
    {
      value: 2,
      label: "Part-time",
    },
    {
      value: 3,
      label: "Remote",
    },
    {
      value: 4,
      label: "Internship",
    },
  ],
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
