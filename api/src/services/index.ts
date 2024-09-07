import { containerKeys } from "@/config";
import { Container } from "@/utils/container";

import { bindAxios } from "./axios";
import { bindDynamo } from "./aws-dynamo";
import { bindLogger } from "./logger";
import { bindS3 } from "./aws-s3";
import { bindSession } from "./electro-session";

const container = Container.init(containerKeys);

export { bindAxios, bindDynamo, bindLogger, bindS3, bindSession, container, Container };
