import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InquiriesTable from "./InquiriesTable";
import InquiryResponseModal from "./InquiryResponseModal";

interface InquiriesProps {
  inquiries: any[];
  onRespond: (id: string, status: string, response: string) => void;
}

const Inquiries = ({ inquiries, onRespond }: InquiriesProps) => {
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const openInquiries = inquiries.filter(inquiry => inquiry.status === 'pending');
  const closedInquiries = inquiries.filter(inquiry => 
    ['responded', 'ignored'].includes(inquiry.status || '')
  );

  const handleIgnore = (inquiryId: string) => {
    onRespond(inquiryId, 'ignored', 'Inquiry ignored by admin');
  };

  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader>
        <CardTitle>Contact Form Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="open" className="space-y-4">
          <TabsList>
            <TabsTrigger value="open">Open Inquiries ({openInquiries.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed Inquiries ({closedInquiries.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <InquiriesTable
              inquiries={openInquiries}
              onRespond={setSelectedInquiry}
              onIgnore={handleIgnore}
            />
          </TabsContent>
          <TabsContent value="closed">
            <InquiriesTable
              inquiries={closedInquiries}
              onRespond={setSelectedInquiry}
              onIgnore={handleIgnore}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {selectedInquiry && (
        <InquiryResponseModal
          inquiry={selectedInquiry}
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onRespond={onRespond}
        />
      )}
    </Card>
  );
};

export default Inquiries;