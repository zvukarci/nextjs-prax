ARG NODE_VERSION=22

# ----------------------------------------
FROM node:${NODE_VERSION} as dev

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo "$SNIPPET" >> "/root/.bashrc"

RUN apt update && apt install -y git

ENV HOME /home/node
WORKDIR $HOME/app
