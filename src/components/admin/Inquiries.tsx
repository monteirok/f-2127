import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "./StatusBadge";
import InquiryResponseModal from "./InquiryResponseModal";

interface InquiriesProps {
  inquiries: any[];
  onRespond: (id: string, status: string, response: string) => void;
}

const Inquiries = ({ inquiries, onRespond }: InquiriesProps) => {
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const openInquiries = inquiries.filter(inquiry => inquiry.status === 'pending');
  const closedInquiries = inquiries.filter(inquiry => inquiry.status === 'responded');

  const renderInquiriesTable = (inquiriesList: any[]) => {
    if (!inquiriesList || inquiriesList.length === 0) {
      return (
        <p className="text-center text-muted-foreground py-8">No inquiries found.</p>
      );
    }

    return (
      <ScrollArea className="h-[600px] w-full">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiriesList.map((inquiry) => (
              <TableRow 
                key={inquiry.id}
                className={`hover:bg-muted/50 transition-colors ${inquiry.status === 'responded' ? 'bg-green-50' : ''}`}
              >
                <TableCell className="font-medium">
                  {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell><StatusBadge status={inquiry.status} /></TableCell>
                <TableCell>
                  {inquiry.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-green-500 hover:text-white transition-colors"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      Respond
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    );
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
            {renderInquiriesTable(openInquiries)}
          </TabsContent>
          <TabsContent value="closed">
            {renderInquiriesTable(closedInquiries)}
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