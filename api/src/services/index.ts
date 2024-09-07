import { containerKeys } from "@/config";
import { Container } from "@/utils/container";

import { bindDynamo } from "./aws-dynamo";
import { bindS3 } from "./aws-s3";
import { bindAxios } from "./axios";
import { bindSession } from "./electro-session";
import { bindLogger } from "./logger";

const container = Container.init(containerKeys);

export { bindAxios, bindDynamo, bindLogger, bindS3, bindSession, container, Container };
