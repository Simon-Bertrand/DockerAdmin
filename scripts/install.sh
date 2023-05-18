#!/bin/bash
python -m venv .venv
source ./scripts/activate.sh
pip install -r api/requirements.txt
cd website && npm i && cd ../