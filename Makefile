# Copyright 2017 The Cockroach Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied. See the License for the specific language governing
# permissions and limitations under the License. See the AUTHORS file
# for names of contributors.

export ADDR ?= postgresql://ilija:Kc-LT0mTEyMjM7IEVJ4lIw@free-tier13.aws-eu-central-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Drigid-hare-4477

.PHONY: start
start:
	npm start

.PHONY: deps
deps:
	npm install
