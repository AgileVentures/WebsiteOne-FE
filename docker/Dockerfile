FROM node:10.13.0-alpine as production-build
COPY .  .

# Install yarn
RUN npm install -g yarn

# Install only production dependencies
RUN yarn install

# create the production build (./build)
RUN yarn build

# Server the production build created with NginX
FROM nginx:1.13.9-alpine
LABEL app="websiteone-fe"

COPY --from=production-build ./dist /usr/share/nginx/html
COPY docker-config/vhost.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
