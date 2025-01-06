'use client'

import CollapsibleSection from "./CollapsibleSection"

export default function Explaination() {
    return (
        <>
            <div className="bg-green-500 flex flex-col items-start min-h-64 rounded-xl px-3 py-5 gap-3">
                <CollapsibleSection title="Explanation for this dumba$$ redirect thing -&gt;">
                    <p>As you know that AWS gives a <span className="font-bold text-yellow-300">generous free tier for 12 months</span>, and one of my seniors told me to deploy something online,
                        so I created an AWS account. After verification, I was given those <span className="font-bold text-yellow-300">sweet 720hrs of free tier EC2 instance</span>, and immediately coded & deployed my CV. But little did I know that 720hrs are gonna go poof soon.</p>
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="Why I did this? -&gt;">
                    <p>So when I left the EC2 instance running for 28 days (in the month of December, 2024), I got a
                        mail from AWS that I've utilized over <span className="bg-yellow-300 text-yellow-900 px-1 rounded">90% of my free tier</span>. I talked to people and found out
                        that if I left the instance running then it'll be considered as active usage. And for some
                        reason this didn't come to my mind earlier. Luckily 2024 ended and I got the free tier renewal
                        for 2025. So I decided to do something about this, so that I don't have to pay any more (I mean
                        c'mon I've already paid <span className="underline decoration-dotted">$13 for the domain</span>. I'm not gonna pay for cloud until I get a job.) And
                        here you are, witnessing the <span className="italic text-gray-100">jankiest solution</span> that my dumba$$ brain made.</p>
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="What the hell is happening here?">
                    <p>Don't worry, let me tell you all a story about <s className="text-red-300">a mouse
                        named Dolory</s>, ughm... I mean this janky redirect thing. So to minimize my EC2 instance's
                        usage I had to basically stop the instance. For that, I decided to use AWS' <span className="font-bold text-yellow-300">lambda functions</span>
                        (still couldn't figure out how to use TypeScript in lambda, Skill Issue for sure) with Cloudwatch
                        Schedule (now known as EventBridgeScheduler) and use Porkbun's API for domain management. So
                        this redirect thing just activates a lambda function to start the instance and change the domain's
                        DNS to EC2 instance's IPv4 address. And a Cloudwatch Schedule is running every 30 mins to simply
                        trigger a lambda function for stopping the instance, and adding a URL forward to my
                        domain, to this redirect page where you are currently at.</p>
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="Errors and Challenges -&gt;">
                    <p>There are many points of failures and errors because this is basically
                        a hotfix for this issue. I could've used ElasticIP in AWS, could've bought a cheap VPS, could've
                        done something entirely different which would've made my life easier, but I like to have some
                        challenges. And besides all of the things I thought of would require paying for the services,
                        and I don't want that. The most annoying error is the <span className="font-bold bg-red-200 text-red-900 px-1 rounded">"404 (002) pixie proxy" error</span> (learn more).
                        And I don't have any control over this error. It'll take around <span className="font-semibold text-red-700">60-90 seconds</span> to automatically
                        get fixed, and if it's not fixed then you have to <span className="font-semibold underline text-gray-900">clear your cache/site data</span>, and do ipflushdns
                        command, and restart your modem/router, etc etc. Basically, you would have to either open my CV
                        domain in incognito mode once or on another device altogether. Because <span className="underline text-blue-400">DNS propagation</span> sometimes
                        just straight up sucks, and mix some magic of caching with it and you get an unbeatable final
                        level boss error.</p>
                </CollapsibleSection>
                <br />
                <CollapsibleSection title="Final words -&gt;">
                    <p>So if you got redirected to my online CV, then great, I'm a <span className="font-bold text-yellow-300">good programmer</span>.
                        If not, then do drop an email that I <span className="font-semibold bg-red-600 text-white px-1 rounded">suck at programming</span> and I should just do coding in Scratch.
                        <br />
                        That's all from me, <span className="font-extrabold text-lg text-gray-100">Bye.</span></p>
                </CollapsibleSection>
                <br /><br />
            </div >
        </>
    );
}
