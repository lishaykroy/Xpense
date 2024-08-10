import React , { useState, useEffect } from "react";
import { Trash2 , Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog , DialogContent , DialogDescription , DialogFooter , DialogHeader , DialogTitle , DialogTrigger , DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";

function IncomeItem({ income, onDelete, onEdit }) {

  const [ isEditing , setIsEditing ] = useState(false);

  const [ openEmojiPicker , setOpenEmojiPicker ] = useState(false);

  const [ editData , setEditData ] = useState({

    name: income.name,
    amount: income.amount,
    icon: income.icon,

  });

  useEffect(() => {
    if (!isEditing) {
      setOpenEmojiPicker(false);
    }
  }, [isEditing]);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });

  };

  const handleIconChange = (emoji) => {

    setEditData({ ...editData, icon: emoji.emoji });
    setOpenEmojiPicker(false);

  };

  const handleEditSubmit = () => {

    onEdit(income.id, editData);
    setIsEditing(false);

  };

  return (

    <div className="p-5 border rounded-2xl hover:shadow-md h-[170px] relative">

      <div className="flex gap-2 items-center justify-between">

        <div className="flex gap-2 items-center">

          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">

            {income?.icon}

          </h2>

          <div>

            <h2 className="font-bold">{income.name}</h2>

            <h2 className="text-sm text-gray-500">

              {income.totalItem}
              
              Item

            </h2>

          </div>

        </div>

        <h2 className="font-bold text-primary text-lg">

          ${income.amount}

        </h2>

      </div>

      <div className="absolute bottom-2 right-2 flex gap-2">

        <Dialog>

          <DialogTrigger asChild>

            <Button variant="destructive" size="icon">

              <Trash2 className="h-4 w-4" />

            </Button>

          </DialogTrigger>

          <DialogContent>

            <DialogHeader>

              <DialogTitle>
                
                Confirm Action
                
              </DialogTitle>

              <DialogDescription>

                Are you sure you want to delete this income item? This action cannot be undone.

              </DialogDescription>

            </DialogHeader>

            <DialogFooter>

              <DialogClose asChild>

                <Button variant="outline" className="mr-2">
                  
                  Cancel
                  
                </Button>

              </DialogClose>

              <Button variant="destructive" onClick={() => onDelete(income.id)}>
                
                Delete
                
              </Button>

            </DialogFooter>

          </DialogContent>

        </Dialog>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>

          <DialogTrigger asChild>

            <Button size="icon">

              <Edit3 className="h-4 w-4" />

            </Button>

          </DialogTrigger>

          <DialogContent>

            <DialogHeader>

              <DialogTitle>
                
                Edit Income
                
              </DialogTitle>

              <DialogDescription>

                Make changes to your income item.

              </DialogDescription>

            </DialogHeader>

            <div className="space-y-4">

              <div>

                <label className="block text-sm font-medium text-gray-700">

                  Icon
                  
                </label>

                <div className="relative">

                  <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>

                    {editData.icon}

                  </Button>

                  {openEmojiPicker && (
                    <div className="absolute z-20">
                      <EmojiPicker onEmojiClick={handleIconChange} />
                    </div>
                  )}

                </div>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700">

                  Source Name

                </label>
                
                <Input name="name" value={editData.name} onChange={handleInputChange} placeholder="e.g. Youtube"/>

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700">

                  Monthly Amount

                </label>
                
                <Input name="amount" type="number" value={editData.amount} onChange={handleInputChange} placeholder="e.g. 5000$"/>

              </div>

            </div>

            <DialogFooter>

              <Button variant="outline" onClick={() => setIsEditing(false)}>
                
                Cancel
                
              </Button>

              <Button onClick={handleEditSubmit}>
                
                Save
                
              </Button>

            </DialogFooter>

          </DialogContent>

        </Dialog>

      </div>

    </div>

  );
  
}

export default IncomeItem;