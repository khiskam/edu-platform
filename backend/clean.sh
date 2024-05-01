#!/bin/bash

shopt -s extglob

ENT_DIR=ent

cd $ENT_DIR && rm -rf !(generate.go|migrate|schema)
cd migrate && rm -rf !(migrations|main.go)