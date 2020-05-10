FROM node:10-slim as builder
COPY ./ /app
WORKDIR /app
RUN yarn && yarn build

FROM nginx as service
RUN mkdir /app
COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

