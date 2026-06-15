import dotenv from "dotenv";
import app from "./app";
import clienteService from "./services/clienteService";
import path from "path";

dotenv.config({path: path.resolve(__dirname, "../../.env")})

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    try {

        await clienteService.loadClientes();

        app.listen(PORT, () => {
            console.log(
                `Servidor rodando na porta ${PORT}`
            );
        });

    } catch (error) {

        console.error(
            "Erro ao iniciar aplicação",
            error
        );

        process.exit(1);
    }
}

bootstrap();