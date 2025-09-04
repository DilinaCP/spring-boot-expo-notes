=== SPRING BOOT BACKEND SETUP ===

1. Ensure Java 17+ and Maven are installed
2. Navigate to this folder in terminal
3. Run: ./mvnw spring-boot:run (or mvn spring-boot:run)
4. Server will start on: http://localhost:8080
5. API will be available at: http://localhost:8080/api/notes
6. H2 Database console: http://localhost:8080/h2-console
   - JDBC URL: jdbc:h2:mem:testdb
   - Username: sa
   - Password: (leave blank)