import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import InquiryTableRow from "./InquiryTableRow";

interface InquiriesTableProps {
  inquiries: any[];
  onRespond: (inquiry: any) => void;
  onIgnore: (inquiryId: string) => void;
}

const InquiriesTable = ({ inquiries, onRespond, onIgnore }: InquiriesTableProps) => {
  if (!inquiries || inquiries.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">No inquiries found.</p>
    );
  }

  return (
    <ScrollArea className="h-[600px] w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50 dark:hover:bg-muted/10">
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <InquiryTableRow
              key={inquiry.id}
              inquiry={inquiry}
              onRespond={() => onRespond(inquiry)}
              onIgnore={() => onIgnore(inquiry.id)}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default InquiriesTable;