
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const benefits = [
  "Personalized Job Recommendations",
  "Exclusive Access to Premium Job Postings",
  "Resume Review by Industry Experts",
  "Priority Application Status",
  "Career Counseling Sessions",
  "Access to Skill-Building Workshops",
  "Direct Connections with Recruiters",
];

export default function JoinMembershipPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header variant="default" />
      <main className="flex-1 flex items-center justify-center py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Benefits */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                 <Zap className="h-8 w-8" />
                 <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                    Unlock Your Career Potential
                 </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Join Zensolve's exclusive membership program and get the edge you need to land your dream job.
              </p>
              <div>
                <h3 className="text-xl font-bold mb-4">What You'll Get:</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Glassmorphism Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl -rotate-3"></div>
              <div className="relative bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/20 dark:border-black/20 rounded-2xl shadow-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground">
                  Membership Card
                </h3>
                <p className="text-muted-foreground mt-2 mb-6">One-time payment for lifetime access</p>

                <div className="bg-primary/10 p-6 rounded-lg mb-6">
                    <p className="text-lg font-semibold text-primary">Special Limited-Time Offer!</p>
                    <div className="flex items-baseline justify-center gap-4 my-2">
                        <span className="text-2xl text-muted-foreground line-through">₹2000</span>
                        <span className="text-5xl font-bold text-primary">₹1000</span>
                    </div>
                </div>
                
                <Button asChild size="lg" className="w-full text-lg font-bold">
                    <Link href="https://rzp.io/rzp/zensolvemembership">
                        Proceed to Pay 
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
