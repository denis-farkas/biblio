import initBookRoutes from "./book.routes.js";
import initGenreRoutes from "./genre.routes.js";
import initUserRoutes from "./user.routes.js";

const initRoutes = (app) => {
    initBookRoutes(app)
    initGenreRoutes(app)
    initUserRoutes(app)
    };

export default initRoutes;
