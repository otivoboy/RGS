import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-[1440px] px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-headline">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Please read our terms and policies carefully
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Purchase Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                All purchases are final upon payment confirmation. We accept
                cash, credit cards, mobile money, and bank transfers for
                in-store purchases.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>All prices are subject to change without notice</li>
                <li>
                  Product availability is not guaranteed until purchase is
                  completed
                </li>
                <li>We reserve the right to limit quantities on certain items</li>
                <li>Special orders require 50% deposit upfront</li>
                <li>Country wide delivery available with additional charges</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Delivery Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                We offer country wide delivery service across Kenya with
                reliable and secure shipping.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nairobi delivery: KSh 200-500 depending on location</li>
                <li>Country wide delivery: KSh 500-1500 depending on distance</li>
                <li>Standard delivery: 2-5 business days</li>
                <li>
                  Express delivery: 1-2 business days (additional charges apply)
                </li>
                <li>Free delivery on orders over KSh 50,000 within Nairobi</li>
              </ul>
              <p className="mt-4">
                Delivery times are estimates and may vary due to weather or
                other circumstances beyond our control.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Warranty Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                We provide manufacturer warranty on all products sold. Warranty
                terms vary by product and manufacturer.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Mobile phones: 1-2 years manufacturer warranty</li>
                <li>Laptops: 1-3 years manufacturer warranty</li>
                <li>Desktop PCs: 1-3 years parts and labor warranty</li>
                <li>Home appliances: 1-5 years manufacturer warranty</li>
                <li>Accessories: 30 days to 1 year depending on item</li>
              </ul>
              <p className="mt-4">
                Warranty claims must be accompanied by original receipt and
                packaging when possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Return & Exchange Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Returns and exchanges are accepted within 14 days of purchase
                for unopened items in original packaging.
              </p>
              <h4 className="font-semibold mt-4">Conditions for Returns:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Item must be in original, unopened packaging</li>
                <li>All accessories and documentation must be included</li>
                <li>Original receipt required</li>
                <li>No physical damage to product or packaging</li>
                <li>
                  Customer bears return shipping costs for country wide
                  deliveries
                </li>
              </ul>
              <h4 className="font-semibold mt-4">Non-Returnable Items:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Opened software and digital products</li>
                <li>Personalized or customized items</li>
                <li>Items damaged by customer misuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                For questions about these terms or any other concerns, please
                contact us:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Phone:</strong> +254 729 462 462
                </p>
                <p>
                  <strong>Email:</strong> info@rwathiagadgetstore.com
                </p>
                <p>
                  <strong>Address:</strong> HH Towers, Moi Avenue, Nairobi, Kenya
                </p>
                <div className="mt-4">
                  <p><strong>Store Hours:</strong></p>
                  <ul className="list-none pl-0 space-y-1 text-sm">
                    <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                    <li>Saturday: 8:00 AM - 9:00 PM</li>
                    <li>Sunday: 10:00 AM - 3:00 PM</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                These terms and conditions are effective as of January 1, 2024,
                and may be updated periodically.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
