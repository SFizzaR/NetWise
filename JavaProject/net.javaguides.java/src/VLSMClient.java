import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class VLSMClient {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Get user inputs
        System.out.print("Enter base network (e.g., 192.168.1.0/24): ");
        String baseNetwork = scanner.nextLine();

        System.out.print("Enter base IP (e.g., 192.168.1.0): ");
        String baseIp = scanner.nextLine();

        System.out.print("Enter host requirements (comma-separated, e.g., 50,25,10): ");
        String[] hostStr = scanner.nextLine().split(",");
        StringBuilder hostArray = new StringBuilder("[");
        for (int i = 0; i < hostStr.length; i++) {
            hostArray.append(hostStr[i].trim());
            if (i != hostStr.length - 1)
                hostArray.append(",");
        }
        hostArray.append("]");

        try {
            // Send request to /calculate_vlsm for VLSM JSON result
            URL url = new URL("http://127.0.0.1:5000/calculate_vlsm");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setDoOutput(true);

            String jsonInput = String.format("""
                    {
                        "base_network": "%s",
                        "base_ip": "%s",
                        "host_requirements": %s,
                        "output": "json"
                    }
                    """, baseNetwork, baseIp, hostArray.toString());

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInput.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = conn.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                String jsonResponse = processVLSMResponse(conn);
                System.out.println("Response JSON: " + jsonResponse);
            } else {
                String errorResponse = processErrorResponse(conn);
                System.out.println("Error response: " + errorResponse);
            }

        } catch (IOException e) {
            System.out.println("IOException occurred:");
            e.printStackTrace();
        }
    }

    private static String processVLSMResponse(HttpURLConnection conn) throws IOException {
        StringBuilder response = new StringBuilder();
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), "utf-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line.trim());
            }
        }
        return response.toString();
    }

    private static String processErrorResponse(HttpURLConnection conn) throws IOException {
        StringBuilder error = new StringBuilder();
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getErrorStream(), "utf-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                error.append(line.trim());
            }
        }
        return error.toString();
    }
}
