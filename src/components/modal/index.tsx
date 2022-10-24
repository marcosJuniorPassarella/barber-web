import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "../../pages/dashboard";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  finishService: () => Promise<void>;
  data: ScheduleItem;
}

export function ModalInfo({
  isOpen,
  onOpen,
  onClose,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <Modal colorScheme={"orange"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        <ModalHeader color="white">Próximo</ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>
          <Flex align="center" mb={3}>
            <Text color='white'>Teste Modal</Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
