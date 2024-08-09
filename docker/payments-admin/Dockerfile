FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack use pnpm@9.x
RUN pnpm install -g @nestjs/cli
ENV NODE_ENV=production

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --frozen-lockfile

RUN node_modules/.bin/nx build payments-admin
RUN pnpm deploy --filter=payments-admin --prod /prod/payments-admin
RUN cp -R apps/payments-admin/dist /prod/payments-admin/dist

FROM nginx:alpine
COPY --from=build /prod/payments-admin/dist /usr/share/nginx/html
COPY docker/payments-admin/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
