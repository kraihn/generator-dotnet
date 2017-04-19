FROM microsoft/aspnetcore-build:1.1

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install Nuget dependencies
COPY *.sln /app/
# Copy all csproj files in the soution individually
# COPY src/WebApi/WebApi.csproj /app/src/WebApi/
RUN dotnet restore *.sln

# Copy application files
COPY . /app

# Serving
EXPOSE 5000

ENTRYPOINT ["dotnet"]
CMD ["--help"]
