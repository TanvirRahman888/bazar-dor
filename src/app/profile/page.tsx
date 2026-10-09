"use client";

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  ArrowRight,
  Check,
  Envelope,
  House,
  Pencil,
  Person,
  Picture,
  ShieldCheck,
} from "@gravity-ui/icons";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";

import {
  authClient,
  useSession,
} from "@/lib/auth-client";

const Profile = () => {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  // ================= SET CURRENT USER DATA =================

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setImage(session.user.image ?? "");
    }
  }, [session]);

  // ================= UPDATE USER =================

  const handleUpdate = async (
    e: FormEvent<HTMLFormElement>,
    close: () => void,
  ) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanImage = image.trim();

    if (cleanName.length < 2) {
      toast.error(
        "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
      );

      return;
    }

    try {
      setUpdating(true);

      const { error } =
        await authClient.updateUser({
          name: cleanName,
          image: cleanImage || null,
        });

      if (error) {
        toast.error(
          error.message ??
            "প্রোফাইল আপডেট করা যায়নি",
        );

        return;
      }

      // Refresh Better Auth session
      await refetch();

      toast.success(
        "প্রোফাইল সফলভাবে আপডেট হয়েছে",
      );

      close();
    } catch (error) {
      console.error(
        "Profile update error:",
        error,
      );

      toast.error(
        "প্রোফাইল আপডেট করার সময় সমস্যা হয়েছে",
      );
    } finally {
      setUpdating(false);
    }
  };

  // ================= LOADING =================

  if (isPending) {
    return <ProfileLoading />;
  }

  // ================= ERROR =================

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f8f4] px-4">
        <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            কিছু একটা সমস্যা হয়েছে
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনার প্রোফাইল তথ্য লোড করা
            যায়নি। অনুগ্রহ করে আবার চেষ্টা
            করুন।
          </p>
        </div>
      </main>
    );
  }

  // ================= NOT LOGGED IN =================

  if (!session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f8f4] px-4">
        <div className="max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Person
              width={30}
              height={30}
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            আপনি লগইন করেননি
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনার প্রোফাইল দেখতে প্রথমে
            অ্যাকাউন্টে সাইন ইন করুন।
          </p>

          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;

  const firstLetter =
    user.name?.charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f4f8f4] py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* ================= PAGE HEADING ================= */}

          <div className="mb-6">
            <p className="text-sm font-medium text-emerald-600">
              আমার অ্যাকাউন্ট
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার ব্যক্তিগত এবং অ্যাকাউন্ট
              সম্পর্কিত তথ্য দেখুন ও পরিবর্তন
              করুন।
            </p>
          </div>

          {/* ================= PROFILE HEADER ================= */}

          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
            {/* Cover */}

            <div className="h-32 bg-linear-to-r from-emerald-600 to-green-500 sm:h-40" />

            <div className="relative px-6 pb-7 sm:px-8">
              <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                {/* User info */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  {/* Profile Image */}

                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-emerald-100 shadow-lg sm:h-32 sm:w-32">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={
                          user.name ??
                          "User profile"
                        }
                        width={128}
                        height={128}
                        priority
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-emerald-700">
                        {firstLetter}
                      </span>
                    )}
                  </div>

                  {/* Name / Email */}

                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {user.name}
                      </h2>

                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <Check
                          width={13}
                          height={13}
                        />

                        Active
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* ================= BUTTONS ================= */}

                <div className="flex flex-wrap items-center gap-3">
                  {/* ================= MODAL ================= */}

                  <Modal>
                    {/* Modal Trigger */}

                    <Button className="h-11 gap-2 rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                      <Pencil
                        width={17}
                        height={17}
                      />

                      প্রোফাইল আপডেট করুন
                    </Button>

                    {/* Modal Backdrop */}

                    <Modal.Backdrop variant="blur">
                      <Modal.Container
                        placement="center"
                        size="md"
                      >
                        <Modal.Dialog className="rounded-3xl bg-white">
                          {({ close }) => (
                            <Form
                              onSubmit={(e) =>
                                handleUpdate(
                                  e,
                                  close,
                                )
                              }
                              className="w-full"
                            >
                              {/* Close Button */}

                              <Modal.CloseTrigger />

                              {/* Modal Header */}

                              <Modal.Header className="border-b border-gray-100 px-6 py-5">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Pencil
                                      width={20}
                                      height={20}
                                    />
                                  </div>

                                  <div>
                                    <Modal.Heading className="text-xl font-bold text-gray-900">
                                      প্রোফাইল আপডেট
                                      করুন
                                    </Modal.Heading>

                                    <p className="mt-1 text-sm font-normal text-gray-500">
                                      আপনার নাম এবং
                                      প্রোফাইল ছবির
                                      লিংক পরিবর্তন করুন।
                                    </p>
                                  </div>
                                </div>
                              </Modal.Header>

                              {/* ================= MODAL BODY ================= */}

                              <Modal.Body className="space-y-5 px-6 py-6">
                                {/* Full Name */}

                                <TextField
                                  isRequired
                                  name="name"
                                  aria-label="পূর্ণ নাম"
                                  value={name}
                                  onChange={
                                    setName
                                  }
                                  validate={(
                                    value,
                                  ) => {
                                    if (
                                      value.trim()
                                        .length < 2
                                    ) {
                                      return "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
                                    }

                                    return null;
                                  }}
                                >
                                  <Label className="font-medium text-gray-700">
                                    পূর্ণ নাম
                                  </Label>

                                  <div className="relative mt-2">
                                    <Person
                                      width={
                                        20
                                      }
                                      height={
                                        20
                                      }
                                      className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                                    />

                                    <Input
                                      placeholder="আপনার পূর্ণ নাম"
                                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white"
                                    />
                                  </div>

                                  <FieldError className="mt-1 text-sm text-red-500" />
                                </TextField>

                                {/* Profile Image */}

                                <TextField
                                  name="image"
                                  type="url"
                                  aria-label="প্রোফাইল ছবির লিংক"
                                  value={image}
                                  onChange={
                                    setImage
                                  }
                                  validate={(
                                    value,
                                  ) => {
                                    if (
                                      !value.trim()
                                    ) {
                                      return null;
                                    }

                                    try {
                                      new URL(
                                        value,
                                      );

                                      return null;
                                    } catch {
                                      return "সঠিক ছবির URL লিখুন";
                                    }
                                  }}
                                >
                                  <Label className="font-medium text-gray-700">
                                    প্রোফাইল ছবির
                                    লিংক
                                  </Label>

                                  <div className="relative mt-2">
                                    <Picture
                                      width={
                                        20
                                      }
                                      height={
                                        20
                                      }
                                      className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                                    />

                                    <Input
                                      placeholder="https://example.com/profile.jpg"
                                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white"
                                    />
                                  </div>

                                  <FieldError className="mt-1 text-sm text-red-500" />
                                </TextField>

                                {/* Image URL Status */}

                                {image.trim() && (
                                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <Check
                                        width={
                                          16
                                        }
                                        height={
                                          16
                                        }
                                        className="text-emerald-600"
                                      />

                                      <p className="text-xs font-semibold text-emerald-700">
                                        প্রোফাইল
                                        ছবির লিংক
                                        যোগ করা
                                        হয়েছে
                                      </p>
                                    </div>

                                    <p className="mt-1 truncate text-xs text-gray-500">
                                      {
                                        image
                                      }
                                    </p>
                                  </div>
                                )}
                              </Modal.Body>

                              {/* ================= FOOTER ================= */}

                              <Modal.Footer className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onPress={
                                    close
                                  }
                                  isDisabled={
                                    updating
                                  }
                                  className="rounded-xl px-5"
                                >
                                  বাতিল
                                </Button>

                                <Button
                                  type="submit"
                                  isDisabled={
                                    updating
                                  }
                                  className="gap-2 rounded-xl bg-emerald-600 px-5 font-semibold text-white transition hover:bg-emerald-700"
                                >
                                  <Check
                                    width={
                                      18
                                    }
                                    height={
                                      18
                                    }
                                  />

                                  {updating
                                    ? "আপডেট হচ্ছে..."
                                    : "পরিবর্তন সংরক্ষণ করুন"}
                                </Button>
                              </Modal.Footer>
                            </Form>
                          )}
                        </Modal.Dialog>
                      </Modal.Container>
                    </Modal.Backdrop>
                  </Modal>

                  {/* Home */}

                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <House
                      width={18}
                      height={18}
                    />

                    হোমে ফিরে যান
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ================= DETAILS ================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            {/* Personal Information */}

            <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    ব্যক্তিগত তথ্য
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    আপনার অ্যাকাউন্টের মৌলিক
                    তথ্য
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Person
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="পূর্ণ নাম"
                  value={
                    user.name ||
                    "যোগ করা হয়নি"
                  }
                  icon={
                    <Person
                      width={20}
                      height={20}
                    />
                  }
                />

                <InfoCard
                  title="ইমেইল"
                  value={user.email}
                  icon={
                    <Envelope
                      width={20}
                      height={20}
                    />
                  }
                />

                <InfoCard
                  title="ইমেইল স্ট্যাটাস"
                  value={
                    user.emailVerified
                      ? "ভেরিফাইড"
                      : "ভেরিফাই করা হয়নি"
                  }
                  icon={
                    <Check
                      width={20}
                      height={20}
                    />
                  }
                />

                <InfoCard
                  title="প্রোফাইল ছবি"
                  value={
                    user.image
                      ? "প্রোফাইল ছবি যোগ করা আছে"
                      : "প্রোফাইল ছবি নেই"
                  }
                  icon={
                    <Picture
                      width={20}
                      height={20}
                    />
                  }
                />
              </div>
            </section>

            {/* ================= ACCOUNT ================= */}

            <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">
                অ্যাকাউন্ট
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                আপনার অ্যাকাউন্টের বর্তমান
                অবস্থা
              </p>

              <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <ShieldCheck
                    width={22}
                    height={22}
                  />
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  অ্যাকাউন্ট সক্রিয়
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  আপনার অ্যাকাউন্ট বর্তমানে
                  সক্রিয় রয়েছে।
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href="/"
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  বাজারদর দেখুন

                  <ArrowRight
                    width={17}
                    height={17}
                  />
                </Link>
              </div>
            </section>
          </div>

          {/* ================= BOTTOM MESSAGE ================= */}

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-center text-xs text-gray-400">
            আপনার ব্যক্তিগত তথ্য নিরাপদভাবে
            সংরক্ষিত রয়েছে।
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

/* ================= INFO CARD ================= */

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#fafcfb] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-400">
            {title}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-gray-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= LOADING SKELETON ================= */

function ProfileLoading() {
  return (
    <main className="min-h-screen bg-[#f4f8f4] py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Heading */}

          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-9 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-100" />

          {/* Profile Header */}

          <div className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-white">
            <div className="h-36 animate-pulse bg-gray-200" />

            <div className="px-8 pb-8">
              <div className="-mt-14 h-28 w-28 animate-pulse rounded-3xl border-4 border-white bg-gray-200" />

              <div className="mt-5 h-7 w-48 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          {/* Cards */}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="h-72 animate-pulse rounded-3xl bg-white" />

            <div className="h-72 animate-pulse rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    </main>
  );
}