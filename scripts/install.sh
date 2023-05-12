#!/bin/bash
python -m venv .venv
if [[ -f "./.venv/Scripts/activate" ]]; then
    source ./.venv/Scripts/activate
fi
pip install -r api/requirements.txt
npm i