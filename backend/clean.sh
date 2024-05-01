#!/bin/bash

shopt -s extglob

ENT_DIR=ent

cd $ENT_DIR && rm -rf !(migrate|schema|generate.go)
cd migrate && rm -rf !(migrations|main.go)