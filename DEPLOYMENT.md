# Docker Deployment Guide

## Overview
This project is configured for automatic Docker deployment via Jenkins CI/CD pipeline. Upon a successful build, the application is automatically containerized and deployed.

---

## Architecture

### Multi-Stage Docker Build
1. **Stage 1 - Builder**: Builds the React TypeScript application using Node.js 24
2. **Stage 2 - Production**: Serves the built static files using Nginx

### Deployment Flow
```
GitHub Push → Jenkins Trigger → Build App → Run Tests → Build Docker Image → Deploy Container
```

---

## Files Added for Docker Deployment

### 1. `Dockerfile`
Multi-stage build configuration:
- Uses `node:24-alpine` for building
- Uses `nginx:alpine` for serving
- Optimized for production with minimal image size

### 2. `.dockerignore`
Excludes unnecessary files from Docker build context:
- node_modules (rebuilt inside container)
- .git, documentation, IDE files
- Existing build artifacts

### 3. `docker-compose.yml`
Simplified container orchestration:
- Service name: `devops-app`
- Container name: `devops-project-container`
- Image: `devops-project-app:latest`
- Port mapping: `80:80`
- Auto-restart policy

### 4. Updated `Jenkinsfile`
New stages added:
- **Build Docker Image**: Creates Docker image using docker-compose
- **Stop Old Container**: Removes previous deployment
- **Deploy Docker Container**: Starts new container
- **Verify Deployment**: Confirms container is running

---

## Prerequisites

### On Jenkins Server
1. **Docker Installation**
   ```bash
   # Check if Docker is installed
   docker --version
   docker-compose --version
   ```

2. **Jenkins User Permissions**
   ```bash
   # Add Jenkins user to docker group
   sudo usermod -aG docker jenkins

   # Restart Jenkins
   sudo systemctl restart jenkins
   ```

3. **Docker Service Running**
   ```bash
   # Start Docker
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

---

## Automated Deployment (via Jenkins)

### Pipeline Stages

1. **Checkout Code**
   - Pulls latest code from GitHub main branch

2. **Install Dependencies**
   - Runs `npm install`

3. **Build Application**
   - Executes `npm run build`
   - Creates optimized production build

4. **Run Tests**
   - Runs test suite with `npm test`

5. **Archive Build Artifacts**
   - Archives build folder for reference

6. **Build Docker Image** ⭐ NEW
   - Builds Docker image using Dockerfile
   - Tags as `devops-project-app:latest`

7. **Stop Old Container** ⭐ NEW
   - Stops and removes previous deployment
   - Graceful cleanup

8. **Deploy Docker Container** ⭐ NEW
   - Starts new container using docker-compose
   - Maps port 80

9. **Verify Deployment** ⭐ NEW
   - Waits 5 seconds for startup
   - Verifies container is running
   - Displays deployment status

### Triggering Deployment
Simply push to the `main` branch:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Jenkins will automatically:
1. Detect the push
2. Run the pipeline
3. Deploy the updated application

---

## Manual Deployment (Local)

### Option 1: Using Docker Compose (Recommended)
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Using Docker Commands
```bash
# Build image
docker build -t devops-project-app:latest .

# Stop and remove old container
docker stop devops-project-container 2>/dev/null || true
docker rm devops-project-container 2>/dev/null || true

# Run container
docker run -d \
  --name devops-project-container \
  -p 80:80 \
  --restart unless-stopped \
  devops-project-app:latest

# Check status
docker ps -f name=devops-project-container
```

---

## Accessing the Application

After successful deployment:
- **Local**: http://localhost:80
- **Server**: http://YOUR_SERVER_IP:80

---

## Container Management

### View Logs
```bash
docker logs devops-project-container

# Follow logs in real-time
docker logs -f devops-project-container
```

### Check Container Status
```bash
docker ps -a -f name=devops-project-container
```

### Restart Container
```bash
docker restart devops-project-container
```

### Stop Container
```bash
docker stop devops-project-container
```

### Remove Container
```bash
docker rm -f devops-project-container
```

### View Resource Usage
```bash
docker stats devops-project-container
```

---

## Image Management

### List Images
```bash
docker images | grep devops-project-app
```

### Remove Old Images
```bash
# Remove dangling images
docker image prune -f

# Remove specific image
docker rmi devops-project-app:latest
```

### Inspect Image
```bash
docker inspect devops-project-app:latest
```

---

## Troubleshooting

### Container Won't Start
```bash
# Check logs for errors
docker logs devops-project-container

# Verify image was built correctly
docker images | grep devops-project-app

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Port Already in Use
```bash
# Find process using port 80
netstat -ano | findstr :80  # Windows
lsof -i :80                  # Linux/Mac

# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Permission Denied Errors
```bash
# Ensure Jenkins user has Docker permissions
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Build Fails in Jenkins
1. Check Docker is installed on Jenkins server
2. Verify Jenkins user has Docker permissions
3. Check disk space: `df -h`
4. Review Jenkins console output for errors

---

## Configuration Options

### Change Port
Edit [docker-compose.yml](docker-compose.yml):
```yaml
ports:
  - "8080:80"  # External:Internal
```

Also update [Jenkinsfile](Jenkinsfile):
```groovy
APP_PORT = "8080"
```

### Add Environment Variables
Edit [docker-compose.yml](docker-compose.yml):
```yaml
environment:
  - NODE_ENV=production
  - REACT_APP_API_URL=https://api.example.com
```

### Custom Nginx Configuration
1. Create `nginx.conf`
2. Uncomment in [Dockerfile](Dockerfile):
```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

---

## Security Considerations

### Production Checklist
- [ ] Change default ports if needed
- [ ] Enable HTTPS (add SSL certificates to Nginx)
- [ ] Set up firewall rules
- [ ] Regular image updates for security patches
- [ ] Use specific image tags instead of `latest`
- [ ] Scan images for vulnerabilities: `docker scan devops-project-app:latest`

---

## CI/CD Pipeline Visualization

```
┌─────────────────┐
│   Git Push      │
│   (main branch) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Jenkins Trigger │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Checkout Code   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ npm install     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ npm run build   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ npm test        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Archive Build   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Docker Build    │
│ (Multi-stage)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Stop Old        │
│ Container       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy New      │
│ Container       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify Running  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ✅ DEPLOYED     │
│ http://host:80  │
└─────────────────┘
```

---

## Performance Optimization

### Image Size
Current setup uses Alpine-based images for minimal size:
- `node:24-alpine` (~180MB)
- `nginx:alpine` (~40MB)
- Final image: ~50MB (only Nginx + static files)

### Build Cache
Docker layer caching speeds up rebuilds:
1. Dependencies cached if package.json unchanged
2. Source code changes only rebuild app layer

### Multi-Stage Benefits
- Build dependencies not included in final image
- Smaller attack surface
- Faster deployment

---

## Monitoring

### Health Checks
Add to [docker-compose.yml](docker-compose.yml):
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:80"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logging
View deployment history in Jenkins:
- Build numbers
- Timestamps
- Success/failure status
- Console output

---

## Rollback Strategy

### If Deployment Fails
Jenkins automatically:
1. Logs failure
2. Cleans up failed containers
3. Preserves previous working deployment

### Manual Rollback
```bash
# Stop current container
docker stop devops-project-container

# Find previous working image
docker images | grep devops-project-app

# Run previous version
docker run -d --name devops-project-container -p 80:80 devops-project-app:<previous-tag>
```

---

## Next Steps

### Enhancements
1. **Docker Registry**: Push images to Docker Hub/private registry
2. **HTTPS**: Add SSL/TLS certificates
3. **Kubernetes**: Scale with orchestration
4. **Monitoring**: Integrate Prometheus/Grafana
5. **Blue-Green Deployment**: Zero-downtime updates

### Production Deployment
1. Configure reverse proxy (Nginx/Traefik)
2. Set up load balancer
3. Implement container orchestration
4. Add backup/restore procedures
5. Configure logging aggregation

---

## Support

For issues or questions:
1. Check Jenkins console output
2. Review Docker logs
3. Verify all prerequisites are met
4. Contact DevOps team lead: Violet Grant

---

**Last Updated**: 2025-10-18
**Team**: DevOps-project-Wed-16.30-MD-G6
