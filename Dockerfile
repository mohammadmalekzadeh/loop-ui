FROM node:20.12-alpine3.18 AS base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --silent

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
