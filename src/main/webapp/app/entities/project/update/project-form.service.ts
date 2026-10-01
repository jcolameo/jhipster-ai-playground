import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProject, NewProject } from '../project.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProject for edit and NewProjectFormGroupInput for create.
 */
type ProjectFormGroupInput = IProject | PartialWithRequiredKeyOf<NewProject>;

type ProjectFormDefaults = Pick<NewProject, 'id'>;

type ProjectFormGroupContent = {
  id: FormControl<IProject['id'] | NewProject['id']>;
  name: FormControl<IProject['name']>;
  description: FormControl<IProject['description']>;
};

export type ProjectFormGroup = FormGroup<ProjectFormGroupContent>;

@Service()
export class ProjectFormService {
  createProjectFormGroup(project?: ProjectFormGroupInput): ProjectFormGroup {
    const projectRawValue = {
      ...this.getFormDefaults(),
      ...(project ?? { id: null }),
    };

    return new FormGroup<ProjectFormGroupContent>({
      id: new FormControl(
        { value: projectRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(projectRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(projectRawValue.description),
    });
  }

  getProject(form: ProjectFormGroup): IProject | NewProject {
    return form.getRawValue();
  }

  resetForm(form: ProjectFormGroup, project: ProjectFormGroupInput): void {
    const projectRawValue = { ...this.getFormDefaults(), ...project };
    form.reset({
      ...projectRawValue,
      id: { value: projectRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ProjectFormDefaults {
    return {
      id: null,
    };
  }
}
