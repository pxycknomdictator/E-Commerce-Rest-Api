import multer from "multer";

// create a folder on <root-folder>/dist/public/images

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "dist/public/images");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${uniqueName}.${file.originalname.replace(".", " ").split(" ")[1]}`
    );
  },
});

export const upload = multer({ storage });
