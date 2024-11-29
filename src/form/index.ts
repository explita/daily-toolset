let zodAvailable = true;

try {
  require.resolve("zod");
} catch {
  zodAvailable = false;
}

if (!zodAvailable) {
  throw new Error(
    "Zod is required to use daily-toolset/form utilities. Please install it using `npm install zod`."
  );
}

export { formValidation } from "./formValidation";
