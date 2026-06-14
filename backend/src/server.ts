import app from "./app";
import clienteService from "./services/clienteService";

async function bootstrap() {

    await clienteService.loadClientes();

    app.listen(3000, () => {
        console.log("Servidor iniciado");
    });
}

bootstrap();