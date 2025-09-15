FROM node:18-alpine AS build
WORKDIR /app
COPY packge*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpain
COPY --from=build /app/dist /user/shar/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "deamon off;"]