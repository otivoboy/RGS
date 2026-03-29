
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface PaymentButtonsProps {
  amount: number;
  productName?: string;
  onSuccess?: () => void;
}

export default function PaymentButtons({ amount, onSuccess }: PaymentButtonsProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleMpesaPayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (e.g., 254XXXXXXXXX).",
      });
      return;
    }

    setIsProcessing(true);
    // This is a mock implementation.
    // In a real app, you would call your backend API here.
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "STK Push Sent",
        description:
          "Please check your phone and enter your M-Pesa PIN to complete the payment.",
      });
      if (onSuccess) {
        onSuccess();
      }
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">M-Pesa Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="254XXXXXXXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isProcessing}
        />
      </div>

      <Button
        onClick={handleMpesaPayment}
        disabled={isProcessing || amount <= 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src="/mpesa.png"
              alt="M-Pesa"
              width={24}
              height={24}
              className="mr-2 invert"
            />
            <span className="sm:hidden">Pay (KSh {amount.toLocaleString()})</span>
            <span className="hidden sm:inline">Pay with M-Pesa (KSh {amount.toLocaleString()})</span>
          </div>
        )}
      </Button>
    </div>
  );
}
