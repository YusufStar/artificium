"use client";
import useAuthStore from "@/zustand/useAuthStore";
import useChatStore from "@/zustand/useChatStore";
import { ChevronDown, Plus, Search, Square, Triangle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditProfileDialog from "../Auth/EditProfileDialog";
import NavigationButton from "../ui/navigation-button";
import { useSearchParams } from "next/navigation";
import { useProject } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import axios from "axios";

const Sidebar = () => {
  const { user } = useAuthStore();
  const { pid, setPid, projects, setProjects } = useChatStore();

  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("pid")) {
      setPid(searchParams?.get("pid") as string);
    } else {
      setPid("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      useProject(user.organization.id).then((data) => {
        setProjects(data);
      });
    }
  }, [user]);

  const handleCreateProject = async () => {
    setLoading(true);

    await axios
      .post("/api/organization/project", {
        name: projectName,
        organizationId: user?.organization.id,
        description: projectDescription,
      })
      .then(async (res) => {
        useProject(user.organization.id).then((data) => {
          setProjects(data);
        });
        setLoading(false);

        setProjectDialog(false);
        setProjectName("");
        setProjectDescription("");
        toast.success("Project created successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to create project");
      });
  };

  return (
    <div className="w-[19.5rem] h-full bg-nobbleBlack-800 rounded-20 flex flex-col p-[0.5rem]">
      {/* Sidebar organization info section */}
      <div className="flex w-full h-fit p-24 items-center gap-[1rem] border-b border-[#131619]">
        <Image
          src="/static_images/Avatar.png"
          alt=""
          width={48}
          height={48}
          quality={100}
          className="rounded-20"
        />

        <div className="flex flex-col gap-[0.25rem]">
          {/* Organization Name */}
          <span className="font-semibold text-14 2xl:text-16">
            {user?.organization?.name}
          </span>

          {/* Organization member length */}
          <span className="text-stemGreen-500 text-12 font-medium">
            {user?.organization?.members?.length}
          </span>
        </div>

        <ChevronDown
          width={16}
          height={16}
          color="#686B6E"
          className="ml-auto"
          strokeWidth={3}
        />
      </div>

      <div className="py-24 px-2 flex flex-col gap-24 border-b border-[#131619]">
        <span className="text-12 font-semibold text-nobbleBlack-400">
          GENERAL
        </span>

        <div className="flex flex-col gap-2">
          <NavigationButton path="/search" label="Search" icon={Search} />
          <NavigationButton path="/billing" label="Billing" icon={Search} />
        </div>
      </div>

      <div className="py-24 px-2 flex flex-col gap-24 border-b border-[#131619]">
        <span className="text-12 font-semibold text-nobbleBlack-400">
          PROJECTS
        </span>

        <div className="flex flex-col gap-2">
          {projects?.map((project) => {
            return (
              <NavigationButton
                key={project.id}
                path={`/artificium/?pid=${project.id}`}
                label={project.name}
                color="#B6F09C"
                icon={Square}
                active={pid === project.id}
              />
            );
          })}

          <Dialog
            open={projectDialog}
            onOpenChange={(open) => {
              setProjectDialog(open);
              if (open) {
                setLoading(false);
                setProjectName("");
                setProjectDescription("");
              }
            }}
          >
            <DialogTrigger asChild>
              <button className="border-t rounded-8 p-14 gap-16 flex items-center transition-all hover:opacity-50 bg-nobbleBlack-700 duration-200 ease-in-out">
                <Plus
                  color="#686B6E"
                  className="w-[1.25rem] h-[1.25rem] drop-shadow-icon"
                />
                <span className="font-semibold text-14 text-nobbleBlack-100">
                  Add Project
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectName" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectDescription" className="text-right">
                    Description
                  </Label>
                  <Input
                    type="text"
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={loading}
                  onClick={handleCreateProject}
                  className="bg-stemGreen-500 hover:bg-stemGreen-500/80 font-semibold text-dayBlue-900"
                >
                  {loading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Project Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sidebar user info section */}
      <div className="flex w-full h-fit p-16 mt-auto items-center gap-[1rem] glass-fill rounded-16 border-t border-glassStroke">
        <div
          style={{
            backgroundImage: `url(${user?.profilePhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[48px] h-[48px] object-cover rounded-20 cursor-pointer"
        />

        <div className="flex flex-col text-14 2xl:text-16 gap-[0.25rem]">
          {/* User Name */}
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>

          {/* Organization member length */}
          <span className="text-stemGreen-500 text-12 font-medium">
            Premium
          </span>
        </div>

        <EditProfileDialog />
      </div>
    </div>
  );
};

export default Sidebar;
