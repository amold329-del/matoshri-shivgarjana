"use client";

import Link from "next/link";
import { Target, Eye, Trophy, Quote, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { LotusDivider } from "@/components/ui/decorations";
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings, getStats } from "@/lib/content";
import { dict } from "@/lib/i18n";

export function AboutView() {
  const { tr } = useLanguage();
  const settings = getSettings();
  const stats = getStats();

  const achievements = [
    { en: "47 years of uninterrupted Ganeshotsav celebration", mr: "४७ वर्षे अखंड गणेशोत्सव साजरा" },
    { en: "Officially registered cultural organisation (2025)", mr: "अधिकृत नोंदणीकृत सांस्कृतिक संस्था (२०२५)" },
    { en: "Hundreds of social-service initiatives delivered", mr: "शेकडो सामाजिक सेवा उपक्रम राबवले" },
    { en: "A growing family of 500+ active members", mr: "५००+ सक्रिय सभासदांचे वाढते कुटुंब" },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.cta.about}
        marathiTitle={settings.org.nameShort}
        title={{ en: "Our Story", mr: "आमची कहाणी" }}
        subtitle={{
          en: "Four decades of devotion, culture and service in the heart of Mumbai.",
          mr: "मुंबईच्या हृदयात चार दशकांची भक्ती, संस्कृती आणि सेवा.",
        }}
      />

      {/* Story */}
      <section className="bg-bg py-24">
        <div className="wrap max-w-3xl">
          <SectionHeading
            eyebrow={dict.sections.welcome}
            title={{ en: "A Legacy Born in 1980", mr: "१९८० मध्ये जन्मलेला वारसा" }}
            align="left"
          />
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
            <Reveal>
              <p>
                {tr({
                  en: `What began in ${settings.org.established} as a small gathering of devoted neighbours has grown, over ${settings.org.yearsCount} years, into one of the neighbourhood's most respected Sarvajanik Ganeshotsav Mandals. Our journey has always been guided by three simple words: faith, unity and service.`,
                  mr: `${settings.org.established} साली काही श्रद्धाळू शेजाऱ्यांच्या छोट्या मेळाव्यातून जे सुरू झाले, ते ${settings.org.yearsCount} वर्षांत परिसरातील एक अत्यंत आदरणीय सार्वजनिक गणेशोत्सव मंडळ बनले आहे. आमचा प्रवास नेहमीच तीन साध्या शब्दांनी मार्गदर्शित राहिला आहे — श्रद्धा, एकता आणि सेवा.`,
                })}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                {tr({
                  en: `In ${settings.org.registered}, decades of community work were formalised when the Mandal became an officially registered organisation — a milestone that reflects our commitment to transparency and accountability. Today we celebrate our ${settings.org.yearsCount}th year while looking ahead to a future of digital transformation.`,
                  mr: `${settings.org.registered} साली मंडळ अधिकृतपणे नोंदणीकृत संस्था बनल्यावर दशकांच्या सामाजिक कार्याला औपचारिक रूप मिळाले — हा टप्पा आमच्या पारदर्शकता व उत्तरदायित्वाप्रती असलेल्या बांधिलकीचे प्रतिबिंब आहे. आज आम्ही आमचे ${settings.org.yearsCount} वे वर्ष साजरे करत असतानाच डिजिटल परिवर्तनाच्या भविष्याकडे पाहत आहोत.`,
                })}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-surface-2 py-24">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: dict.sections.mission,
              body: {
                en: "To celebrate Ganeshotsav with devotion while uniting our community through faith, culture and selfless service.",
                mr: "भक्तीने गणेशोत्सव साजरा करताना श्रद्धा, संस्कृती आणि निःस्वार्थ सेवेद्वारे समाजाला एकत्र आणणे.",
              },
            },
            {
              icon: Eye,
              title: dict.sections.vision,
              body: {
                en: "To be a model cultural institution that preserves heritage and drives meaningful social change for generations.",
                mr: "वारसा जपणारी आणि पिढ्यानपिढ्या अर्थपूर्ण सामाजिक बदल घडवणारी आदर्श सांस्कृतिक संस्था बनणे.",
              },
            },
          ].map((c, i) => (
            <Reveal key={c.title.en} delay={i * 0.1}>
              <article className="card-surface h-full p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6b1226,#9e1b32)] text-gold-light">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {tr(c.title)}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{tr(c.body)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-bg py-24">
        <div className="wrap max-w-3xl">
          <SectionHeading
            eyebrow={{ en: "Milestones", mr: "टप्पे" }}
            title={{ en: "Our Achievements", mr: "आमची कामगिरी" }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((a, i) => (
              <Reveal key={a.en} delay={i * 0.08}>
                <div className="flex items-start gap-3 rounded-xl border border-card-border bg-surface p-5">
                  <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-[0.96rem] text-ink">{tr(a)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership message */}
      <section className="bg-surface-2 py-24">
        <div className="wrap max-w-3xl">
          <Reveal>
            <article className="card-surface relative px-7 py-12 text-center sm:px-14">
              <Quote className="mx-auto h-10 w-10 text-gold/40" />
              <p className="mt-5 font-display text-lg font-medium leading-relaxed text-ink sm:text-xl">
                {tr({
                  en: "For 47 years, this Mandal has been more than a festival — it is a family bound by devotion and a shared duty to serve. We invite you to be part of our next chapter.",
                  mr: "४७ वर्षांपासून हे मंडळ केवळ उत्सव नाही — ते भक्ती आणि सेवेच्या सामायिक कर्तव्याने बांधलेले कुटुंब आहे. आमच्या पुढील अध्यायाचा भाग होण्यासाठी आम्ही तुम्हाला आमंत्रित करतो.",
                })}
              </p>
              <LotusDivider className="mt-7" />
              <p className="mt-4 font-display font-bold text-maroon">
                [अध्यक्षांचे नाव]
              </p>
              <p className="text-sm text-ink-soft">{tr({ en: "President", mr: "अध्यक्ष" })}</p>
            </article>
          </Reveal>

          <div className="mt-10 text-center">
            <Link href="/contact" className="btn btn-gold">
              {tr(dict.cta.contactUs)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
