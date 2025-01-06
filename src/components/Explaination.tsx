import CollapsibleSection from "./CollapsibleSection"

export default function Explaination() {
    return (
        <>
            <div className="bg-green-500 flex flex-col items-start min-h-64 rounded-xl px-3 py-2 gap-3">
                <CollapsibleSection title="Explaination for this dumba$$ redirect thing -&gt;">
                    As you know that AWS gives a
                    generous free tier for 12 months, and one of my seniors told me to deploy something online,
                    so I created an AWS account, after verification I was given those sweet 720hrs of free tier
                    EC2 instance, and immediately coded & deployed my cv. But little did I know that 720hrs are
                    gonna go poof soon.
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="Why I did this? -&gt;">
                    So when I left the EC2 instance running for 28 days (in the month of December, 2024), I got a
                    mail from AWS that I've utilized over 90% of my free tier. I talked to people and found out
                    that if I left the instance running then it'll be considered as active usage. And for some
                    reason this didn't come to my mind earlier. Luckily 2024 ended and I got the free tier renewal
                    for 2025. So I decided to do something about this, so that I don't have to pay any more (I mean
                    c'mon I've already paid 13$ for the domain. I'm not gonna pay for cloud until I get a job.) And
                    here you are, witnessing the jankiest solution that my dumba$$ brain made. <br /><br />
                    What the hell is happening here -&gt; Don't worry, let me tell you all a story about <s>a mouse
                        named Dolory</s>, ughm... I mean this janky redirect thing. So to minimize my EC2 instance's
                    usage I had to basically stop the instance. For that I decided to use AWS' lambda functions
                    (still couldn't figure out how to use TypeScript in lambda, Skill Issue for sure) with Cloudwatch
                    Schedule (now known as EventBridgeScheduler) and use Porkbun's API for domain management. So
                    this redirect thing just activates a lambda function to start the instance and change the domain's
                    DNS to EC2 instance's IPv4 address. And a Cloudwatch Schedule is running every 30 mins to simply
                    just trigger a lambda function for stopping the instance, and adding a URL forward to my
                    domain, to this redirect page where you are currently at.
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="Errors and Challenges -&gt;">
                    There are many point of failures and errors, because this is basically
                    a hotfix for this issue. I could've used ElasticIP in aws, could've bought a cheap VPS, could've
                    done something entirely different which would've made my life easier, but I like to have some
                    challenges. And besides all of the things I thought of would require paying for the services,
                    and I don't want that. The most annoying error is the "404 (002) pixie proxy" error (learn more).
                    And I don't have any control over this error. It'll take around 60-90 seconds to automatically
                    get fixed, and if it's not fixed then you have to clear your cache/site data, and do ipflushdns
                    command, and restart your modem/router, etc etc. Basically you would have to either open my cv
                    domain in incognito mode once or on other device altogether. Because DNS propagation sometimes
                    just straight up sucks, and mix some magic of caching with it and you get an unbeatable final
                    level boss error.
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="Final words -&gt;">
                    So if you got redirected to my online cv, then great, I'm a good programmer.
                    If not, then do drop an email that I suck at programming and I should just do coding in scratch.
                    <br />
                    That's all from me, Bye.
                </CollapsibleSection>
            </div>
        </>
    );
}