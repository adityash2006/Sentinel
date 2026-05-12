"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AnalysisResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  actionableTips: string[];
}

export default function ScanMyProfile() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(file => file.type.startsWith('image/'));
      
      if (validFiles.length > 5) {
        toast({ title: 'Limit Reached', description: 'You can only upload up to 5 images.', variant: 'destructive' });
        return;
      }

      setSelectedFiles(validFiles);
      
      const fileUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(fileUrls);
      setResult(null); 
    }
  };

  const handleScan = async () => {
    if (selectedFiles.length === 0) {
      toast({ title: 'Missing Images', description: 'Please upload at least one image of your profile.', variant: 'destructive' });
      return;
    }

    setIsScanning(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/profile/scan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to scan profile');
      }

      const data = await response.json();
      setResult(data);
      toast({ title: 'Scan Complete', description: 'Your AI profile analysis is ready!' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Could not complete the profile scan. Please try again.', variant: 'destructive' });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="container max-w-5xl py-12 mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">AI Profile Scanner</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload screenshots of your LinkedIn or professional social media profiles. Our AI will analyze them visually and provide expert recommendations to improve your professional presence.
        </p>
      </div>

      <Card className="border-dashed border-2 bg-slate-50/50">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
            className="block w-full max-w-sm text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />
          <p className="text-sm text-muted-foreground">Upload up to 5 screenshots (png, jpg, jpeg)</p>
          
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              {previews.map((src, index) => (
                <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden border shadow-sm">
                  <img src={src} className="object-cover w-full h-full" alt={`Preview ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          <Button 
            size="lg" 
            onClick={handleScan} 
            disabled={isScanning || selectedFiles.length === 0}
            className="mt-6"
          >
            {isScanning ? 'Scanning Profile with AI...' : 'Scan My Profile'}
          </Button>

          {isScanning && (
            <div className="w-full max-w-md mt-4 space-y-2">
              <Progress value={undefined} className="h-2" />
              <p className="text-sm text-center text-muted-foreground animate-pulse">
                Analyzing images, extracting text context, and generating visual insights...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center mt-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{result.overallScore}/100</div>
            <p className="font-medium text-lg">Profile Score</p>
            <p className="text-center text-muted-foreground mt-4 max-w-3xl">{result.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader>
                <CardTitle className="text-green-700">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {result.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/30">
              <CardHeader>
                <CardTitle className="text-red-700">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {result.weaknesses.map((weak, i) => (
                    <li key={i}>{weak}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-blue-200 bg-blue-50/30 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Actionable Recommendations</CardTitle>
              <CardDescription>Follow these steps to attract quality opportunities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.actionableTips.map((tip, i) => (
                  <div key={i} className="flex gap-3">
                    <Badge className="h-6 mt-0.5">{i + 1}</Badge>
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}