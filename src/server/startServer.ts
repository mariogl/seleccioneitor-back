import chalk from "chalk";
import app from "./index.js";

const startServer = async (port: number): Promise<void> => {
  app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
  });
};

export default startServer;
