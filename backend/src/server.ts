import "dotenv/config";

import app from "./app";
import clienteService from "./services/clienteService";

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