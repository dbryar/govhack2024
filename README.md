# Project TINA

## Govhack 2024

Project TINA is designed as an AI agent that sits between a constituent and any Local, State or Federal Government Department, Agency, or Service to provide a conversational interface that better facilitates the communication of constituent issues and the resolution of those issues.

#### Authors

[Daniel](dbryar@gmail.com) & [Louisa Bryar](louisa.bryar@gmail.com)

## Introduction

People _love_ to complain about government services. And not just the services, but the way their responsibilities are delivered within the context of the individual.

> - _"Why can't the government fix all these potholes in our roads?"_
> - _"How is it that the government can spend $5 billion on domestic violence prevention programs and I can still hear my neighbours at each other every night?"_
> - _"That developer is cutting down all those beautiful trees. That can't be legal, can it?"_
> - _"My kids want to join the local soccer team but I can't afford the club fees with the cost of food these days. Doesn't the government fund sports clubs?"_

Most of the time though these complaints just boil down to: **This is not acceptable!**

And you know what? Most of the time; it isn't.

The problem on the other side (the government side), it that they _know_ all these complaints are mostly unfounded, or misdirected, and so hard to provide a non-specific (static) answer to - or even suggest a responsible party for - that it all just becomes overwhelming to online content managers. Even though websites are able to handle a large number of visitors and provide an enormous volume of information, given the depth and breadth of government services, the one thing the complainant needs becomes hidden amongst less relevant pages, much like the proverbial needle in a haystack.

When searching on either Google or the site itself, the results may indeed find many results that appear to be the needle, however it is often a service description or indexed content page with no actionable items (buttons to click). "Googling" also assumes some knowledge of how to do an advanced Google search; not much use to a voice only user with a learning disability. To compound the problem every government department is directed to navigate the requirements for search engine optimisation (SEO) algorithms, as are hundreds if not thousands of other government services all over the world doing the same. It is understandable that this leads to a lot of frustration for the general public.

There is however someone - or rather _something_ - that has effectively read the entirety of the published internet, and has been trained to arrange words that appear to answer many of those questions. It just needs a little help and a gentle prompt to set it in the right direction. The next problem however is that we are left with the same conundrum as before: how does a general member of the public craft a prompt that will elicit the right response from a Large Language Model?

## Proposed Solution

TINA is designed to leverage generative language models (AI) to improve the accessibility of Australian Government services at all levels, and in responding to civic enquiries, better craft the communication of public servants back to constituents in a manner that respects their privacy, demographics and circumstances while observing the Australian Government Style Manual.

By delivering more accessible and inclusive communication mediums, TINA aims to enhance the quality of government services, foster trust between the government and its constituents, and contribute to a more inclusive and equitable civic society with greater participation and engagement in democratic processes.

## Video Presentation

https://youtu.be/3975q8Vw06E

## Architecture

#### Constituent Side

The solution utilises a three tier stateless cloud architecture for scale and resilience. A front-end application is used to provide a conversational interface to the user, and a backend API is used to provide contextualised data to the AI model while maintaining the flow of the conversation in a web scale datastore with a short retention period (TTL). This maintains the conversational context for the user without the need to store the entire conversation history, particularly any sensitive or private data, for a long period of time.

Events are captured as data passes though the API to accumulate insights for future analysis and to provide a more complete picture of the user's experience. This data can be paired with similar events from the government side to build a picture of queries and responses, and to identify areas for improvement.

The only data that exits the system is the final draft of the enquiry that the AI has generated. This is then communicated to the government side to be reviewed and actioned.

Future iterations would use native mobile applications for the front-end to leverage the accessibility of voice only interfaces and the built-in capabilities of the device such as screen readers and gesture based navigation.

#### Government Side

Much like the constituent side, the government side also utilises a three tier stateless cloud architecture however the data is stored in a more permanent manner. The backend provides a Restful API that responds to the incoming requests to evaluate enquiries and generate responses that align with the Australian Government Style Manual and the stated goals and guidelines of the relevant department. Responses are then stored in a database for future analysis and to provide additional training data for the AI model.

For demonstration purposes the government side is a simple web application that allows a user to submit an enquiry and receive a tailored response, generated by the AI model. Ideally it would be implemented as an Office 365 extension or similar so as to seamlessly integrate into the existing workflow of the department without having to introduce new applications or tooling.

Naturally in a real world scenario the responses would be generated by the AI model and reviewed by a human before being published/released. Responses are tailored to the context in which they were submitted, without divulging the personal circumstances or private details of the constituent to the government agent, protecting the privacy of the individual. Events are again collected for statistical analysis, to provide a clear picture of the department's performance, and to identify areas for improvement.

## Challenges

1. [Civic participation for a more resilient, cohesive democracy](https://hackerspace.govhack.org/challenges/388)
2. [Improving the Accessibility of Online Government Services](https://hackerspace.govhack.org/challenges/396)
3. [Use AI to transform bureaucratic jargon into plain English](https://hackerspace.govhack.org/challenges/390)
4. [AI in Governance](https://hackerspace.govhack.org/challenges/397)

### 1. Civic Participation

By crafting personalised, demographically-aware responses to civic enquiries and ensuring adherence to the Australian Government Style Manual, TINA aims to provide clear, respectful, and engaging communication. This approach will help build trust in government services by making them more responsive and relevant to individual needs, while fostering a greater understanding of democratic processes. As a result, citizens will feel more empowered to participate in civic life and contribute meaningfully to their communities.

Additionally, the system introduces new approaches to civics and citizenship education by simplifying and personalising complex government information, encouraging wider engagement with both digital and physical civic infrastructures. By enhancing the quality and accessibility of civic communications, this service will help create opportunities for community connection, support deliberation, and ultimately contribute to a more inclusive society where citizens feel a stronger sense of belonging and responsibility.

> ##### 1.1 Criteria
>
> - One government data source: ABS Education Statistics

### 2. Improving Accessibility

TINA enhances accessibility and equity for people with disabilities, ensuring seamless access to essential government services. AI powered tools can simplify navigation, tailor services to specific disabilities, and provide personalised assistance, enabling individuals to engage more easily with government platforms. By using natural language processing, voice recognition, and adaptive interfaces, these solutions can cater to a wide range of disabilities, ensuring that services are intuitive and easy to use. Additionally, AI can support carers by offering real-time assistance navigating government services, submitting requests, and providing tailored information to help them better care for and support individuals with disabilities.

To prevent potential disadvantages, the proposal recommends establishing frameworks that prioritise inclusivity and fairness in AI development. Engaging with people with disabilities and their carers through user-centred design and iterative feedback loops will ensure that their needs are fully considered in the development process. Building public trust in AI driven systems will be achieved through transparent practices, clear communication, and ensuring that AI serves as a supportive tool rather than a replacement for human services. Future adaptations will focus on integrating emerging technologies, such as AI driven accessibility tools and adaptive learning systems, while ensuring that government services remain responsive to advancements and continue to prioritise the public interest.

> ##### 2.1 Criteria
>
> - **Innovation Focus:** Solutions must specifically address the use of AI to increase accessibility of government services for those with a disability, and their carers and supporters.
> - **Technical Feasibility:** Proposals should include a clear plan for implementing the AI solution, including technical requirements, feasibility assessment and potential challenges.
> - **Ethical Considerations:** All proposals must demonstrate a commitment to ethical AI practices, including considerations for fairness, privacy, and transparency.

### 3. Jargon Busting

AI tools will be tuned to ensure that all content generated adheres to the Australian Government Style Manual. By applying machine learning models specifically augmented with a model trained on the rules and guidelines of the manual, TINA will assist in creating, editing, and reviewing content to guarantee clarity, accuracy, and readability. Incoming queries will be supplemented with relevant demographic information from constituents to provide tailored communication while preserving their privacy. TINA will inject an identifier (GUID) into the enquiry to maintain privacy, allowing the agent to manage the response without exposing sensitive data to government employees. This method builds public trust by safeguarding private information and ensuring that communications align with constituent needs while maintaining a consistent tone and structure as prescribed by the style manual.

To address the challenge of large language models trained on US English, this service will employ a specialised AI model explicitly tuned to Australian English spelling, grammar, and style guidelines. It will utilise retrieval augmented generation (RAG) to ensure that generated content is based on authoritative and reliable sources. By integrating expert knowledge into the content generation process, the service prevents the introduction of errors or misinformation. Additionally, a multi-agent approach could be adopted to train smaller models focusing on distinct elements of the Style Manual, such as punctuation, tone, and inclusive language. These specialised models will work in tandem, improving the overall quality, efficiency, and compliance of AI generated government communications with respect to Australian standards.

> ##### 3.1 Criteria
>
> - None

### 4. AI in Governance

TINA will dramatically boost operational efficiency in government by acting as a smart intermediary between constituents and government departments. This conversational AI agent automates repetitive queries and routine interactions, reducing the administrative burden on government employees. It can handle common issues, quickly provide relevant information, and triage more complex matters to the appropriate department _within the appropriate level of government_. The agent optimises workflows by ensuring enquiries are accurately routed, minimising delays and enhancing the speed of resolution for constituents, while allowing public servants to focus on more complex tasks.

To improve transparency, the AI agent can provide real-time updates to both the government and constituents, ensuring that communication is clear and traceable. By documenting interactions and tracking the resolution process, the agent enhances visibility into how issues are addressed, building confidence in government responsiveness. TINA also prioritises ethical use, with clear frameworks in place to ensure fairness and transparency in agent operations, mitigating algorithmic bias and maintaining public trust. Robust privacy measures ensure that constituent data remains secure and confidential, fostering trust in AI driven services while maintaining efficiency and transparency across all levels of government.

> ##### 4.1 Criteria
>
> - **Innovation Focus:** Solutions must specifically address the use of AI in public sector efficiency and transparency.
> - **Technical Feasibility:** Proposals should include a clear plan for implementing the AI solution, including technical requirements, feasibility assessment and potential challenges.
> - **Ethical Considerations:** All proposals must demonstrate a commitment to ethical AI practices, including considerations for fairness, privacy, and transparency.

## Datasets

- [ABS Education Statistics](https://www.abs.gov.au/statistics/people/education)
- https://services-ap1.arcgis.com/ypkPEy1AmwPKGNNv/arcgis/rest/services/ABS_Education_and_employment_by_2021_LGA_Nov_2023/FeatureServer/0
- https://services-ap1.arcgis.com/ypkPEy1AmwPKGNNv/arcgis/rest/services/ABS_Education_and_employment_by_2021_LGA_Nov_2023/FeatureServer/0/query?outFields=*&where=1%3D1
- [Australian Government Style Guide](https://www.stylemanual.gov.au/)
