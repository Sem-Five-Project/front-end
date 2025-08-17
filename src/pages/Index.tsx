import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../src/components/ui/card";
import {
  User,
  LogIn,
  UserPlus,
  Bell,
  Shield,
  Zap,
  BookOpen,
  Users,
  Award
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, router]);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Find Tutors",
      description: "Connect with expert tutors in your subject area"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Learn Together",
      description: "Collaborate with other students in study groups"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">TutorConnect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Connect with expert tutors and fellow students to accelerate your learning journey
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => router.push('/login')}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg"
              onClick={() => router.push('/register')}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Register
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up as a student or tutor in minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find & Connect</h3>
              <p className="text-gray-600">Browse tutors or students based on your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-600">Schedule sessions and achieve your goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
