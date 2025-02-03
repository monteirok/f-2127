import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";

interface InquiryTableRowProps {
  inquiry: any;
  onRespond: () => void;
  onIgnore: () => void;
}

const InquiryTableRow = ({ inquiry, onRespond, onIgnore }: InquiryTableRowProps) => {
  return (
    <TableRow 
      className={`
        hover:bg-muted/50 dark:hover:bg-muted/10 transition-colors
        ${inquiry.status === 'responded' ? 'bg-green-50/50 dark:bg-green-900/20' : ''}
        ${inquiry.status === 'ignored' ? 'bg-red-50/50 dark:bg-red-900/20' : ''}
      `}
    >
      <TableCell className="font-medium">
        {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
      </TableCell>
      <TableCell>{inquiry.name}</TableCell>
      <TableCell><StatusBadge status={inquiry.status} /></TableCell>
      <TableCell>
        {inquiry.status === 'pending' && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-green-500 hover:text-white transition-colors"
              onClick={onRespond}
            >
              Respond
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-red-500 hover:text-white transition-colors"
              onClick={onIgnore}
            >
              Ignore
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default InquiryTableRow;