#!/bin/bash
custom_activate(){
  SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
  
  source ".venv/bin/activate"
  export PYTHONPATH="$SCRIPT_DIR/src/"
}

custom_activate

