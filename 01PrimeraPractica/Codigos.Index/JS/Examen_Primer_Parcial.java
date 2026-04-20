
import java.util.Scanner;

public class Examen_Primer_Parcial {
public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String nombre = "", Apellidopaterno = "", ApellidoMaterno = "", FechaNacimiento = "";
        int opcion;

        do {
            System.out.println("\n MENU PRINCIPAL");
            System.out.println("1. Registro de datos personales");
            System.out.println("2. Volumen de figuras");
            System.out.println("3. Salida de datos");
            System.out.println("4. Salir");
            System.out.print("Seleccione una opcion: ");

            while (!sc.hasNextInt()) {
                System.out.print("Error, ingrese un numero valido: ");
                sc.next();
            }

            opcion = sc.nextInt();
            sc.nextLine(); // limpiar buffer

            switch (opcion) {

                case 1:
                    System.out.print("Nombre: ");
                    nombre = validarTexto(sc);

                    System.out.print("Apellido Paterno: ");
                    Apellidopaterno = validarTexto(sc);

                    System.out.print("Apellido Materno: ");
                    ApellidoMaterno = validarTexto(sc);

                    System.out.print("Fecha de nacimiento (dd/mm/yyyy): ");
                    FechaNacimiento = validarTexto(sc);
                    break;

                case 2:
                    menuVolumen(sc);
                    break;

                case 3:
                    System.out.println("\n--- DATOS DEL USUARIO ---");
                    if (nombre.isEmpty()) {
                        System.out.println("No se han capturado datos.");
                    } else {
                        System.out.println("Nombre completo: " + nombre + " " + Apellidopaterno + " " + ApellidoMaterno);
                        System.out.println("Fecha de nacimiento: " + FechaNacimiento);
                    }
                    break;

                case 4:
                    System.out.println("Saliendo del programa...");
                    break;

                default:
                    System.out.println("Opcion invalida.");
            }

        } while (opcion != 4);

        sc.close();
    }

    public static String validarTexto(Scanner sc) {
        String texto;
        do {
            texto = sc.nextLine();
            if (texto.trim().isEmpty()) {
                System.out.print("Entrada invalida, intente de nuevo: ");
            }
        } while (texto.trim().isEmpty());
        return texto;
    }

    public static void menuVolumen(Scanner sc) {
        int opcionFigura;

        System.out.println("\n--- CALCULO DE VOLUMEN ---");
        System.out.println("1. Cilindro");
        System.out.println("2. Cono");
        System.out.println("3. Piramide");
        System.out.print("Seleccione figura: ");

        while (!sc.hasNextInt()) {
            System.out.print("Error, ingrese un numero valido: ");
            sc.next();
        }

        opcionFigura = sc.nextInt();

        double r, h, resultado;

        switch (opcionFigura) {

            case 1:
                r = pedirPositivo(sc, "Radio: ");
                h = pedirPositivo(sc, "Altura: ");
                resultado = Math.PI * r * r * h;
                System.out.println("Volumen del cilindro: " + resultado);
                break;

            case 2:
                r = pedirPositivo(sc, "Radio: ");
                h = pedirPositivo(sc, "Altura: ");
                resultado = (Math.PI * r * r * h) / 3;
                System.out.println("Volumen del cono: " + resultado);
                break;

            case 3:
                double areaBase = pedirPositivo(sc, "Area de la base: ");
                h = pedirPositivo(sc, "Altura: ");
                resultado = (areaBase * h) / 3;
                System.out.println("Volumen de la piramide: " + resultado);
                break;

            default:
                System.out.println("Opcion invalida.");
        }
    }

    public static double pedirPositivo(Scanner sc, String mensaje) {
        double num;

        System.out.print(mensaje);
        while (!sc.hasNextDouble()) {
            System.out.print("Error, ingrese un numero valido: ");
            sc.next();
        }

        num = sc.nextDouble();

        while (num <= 0) {
            System.out.print("Debe ser mayor que 0, intente de nuevo: ");
            while (!sc.hasNextDouble()) {
                System.out.print("Error, ingrese un numero valido: ");
                sc.next();
            }
            num = sc.nextDouble();
        }

        return num;
    }
}
