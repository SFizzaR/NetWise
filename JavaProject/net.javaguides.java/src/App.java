import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Enter IP address (required): ");
            String ip = scanner.nextLine();

            System.out.print("Enter subnet mask (optional): ");
            String subnetMask = scanner.nextLine();

            System.out.print("Enter CIDR (optional): ");
            String cidr = scanner.nextLine();

            System.out.println("Connecting to server...");

            URL url = new URL("http://127.0.0.1:5000/calculate_subnet");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setDoOutput(true);

            // Build JSON input dynamically
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.append("{");
            jsonBuilder.append("\"ip\": \"").append(ip).append("\"");

            if (!subnetMask.isBlank()) {
                jsonBuilder.append(", \"subnet_mask\": \"").append(subnetMask).append("\"");
            }

            if (!cidr.isBlank()) {
                jsonBuilder.append(", \"cidr\": \"").append(cidr).append("\"");
            }

            jsonBuilder.append("}");
            String jsonInput = jsonBuilder.toString();

            System.out.println("Sending request...");
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInput.getBytes("utf-8");
                os.write(input, 0, input.length);
                System.out.println("Request body sent.");
            }

            int responseCode = conn.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Reading successful response...");
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), "utf-8"))) {

                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }

                    System.out.println("Response: " + response);
                }
            } else {
                System.out.println("Reading error response...");
                try (BufferedReader br = new BufferedReader(
                        new InputStreamReader(conn.getErrorStream(), "utf-8"))) {

                    StringBuilder error = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        error.append(line.trim());
                    }

                    System.out.println("Error response: " + error);
                }
            }
        } catch (IOException e) {
            System.out.println("IOException occurred:");
            e.printStackTrace();
        }
    }
}
