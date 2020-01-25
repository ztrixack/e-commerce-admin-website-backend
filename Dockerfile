############################
# STEP 1 prepare the executable source
############################
FROM node:8-alpine AS builder

RUN mkdir /user && \
  echo 'nobody:x:65534:65534:nobody:/:' > /user/passwd && \
  echo 'nobody:x:65534:' > /user/group

WORKDIR /home/node/app

COPY package.json .

RUN npm install

# ############################
# # STEP 2 the running container
# ############################
FROM alpine:latest AS final

COPY --from=builder /user/group /user/passwd /etc/

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

COPY --from=builder /node_modules .

USER nobody:nobody

COPY --chown=nobody:nobody . .

CMD [ "node", "." ]
